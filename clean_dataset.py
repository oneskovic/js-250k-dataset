import os
import glob
from tqdm import tqdm
import random
import shutil
from multiprocessing import Pool
from transformers import AutoTokenizer
import string
from comment_parser import comment_parser
from pyjsparser import parse
import re


MAX_CONTEXT_LENGTH = 4096

def random_str(length=5):
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyz') for i in range(length))

def is_valid_filename(text):
    is_ascii = all(ord(c) < 128 for c in text)
    is_alpha = text.isalpha()
    return is_ascii and is_alpha

def write_sources_to_file(sources):
    with open('data/sources.txt', 'w', encoding='utf-8') as f:
        for item in sources:
            f.write("%s\n" % item)

def write_medium_length_sources():
    # Get all .js files using glob from data folder
    sources = []
    for file in tqdm(glob.glob("data/data/**/*.js", recursive=True)):
        if os.path.isfile(file):
            try:
                # Add sources that have between 50 and 150 lines of code
                if 50 <= len(open(file, encoding="utf8").readlines()) <= 150:
                    sources.append(file)
            except UnicodeDecodeError as e:
                print("UnicodeDecodeError: " + file)

            if len(sources)% 200 == 0:
                write_sources_to_file(sources)
    write_sources_to_file(sources)

def sample_random_sources():
    with open('data/sources.txt', 'r', encoding='utf-8') as f:
        sources = f.readlines()
    sources = [x.strip() for x in sources]
    random_sources = random.sample(sources, 30)
    # Make sure random_sample folder exists
    if not os.path.exists('data/random_sample'):
        os.makedirs('data/random_sample')
    # Copy to random_sample folder
    for source in random_sources:
        shutil.copy(source, 'data/random_sample')

def __copy_star(args):
    source, destination = args
    file_name = os.path.basename(source)
    if os.path.exists(os.path.join(destination, file_name)):
        # Check if files are the same
        if open(source, 'r', encoding='utf-8').read() == open(os.path.join(destination, file_name), 'r', encoding='utf-8').read():
            return
        # Rename file if it already exists
        file_name = file_name.split('.')[0] + random_str(5) + '.js'
        destination = os.path.join(destination, file_name)
    shutil.copy(source, destination)

def copy_files_to_dataset():
    # Make sure dataset folder exists
    if not os.path.exists('data/dataset'):
        os.makedirs('data/dataset')
    # Copy to dataset folder
    with open('data/sources.txt', 'r', encoding='utf-8') as f:
        sources = f.readlines()
    sources = [x.strip() for x in sources]
    destination = 'data/dataset'
    # Copy using multiprocessing pool and log progress with tqdm
    with Pool(6) as p:
        list(tqdm(p.imap(__copy_star, zip(sources, [destination]*len(sources))), total=len(sources)))
    
def remove_files_exceeding_context():
    tokenizer = AutoTokenizer.from_pretrained('bigcode/starcoder')
    files = glob.glob("data/dataset/*.js")
    removed_cnt = 0
    for file in tqdm(files):
        with open(file, 'r', encoding='utf-8') as f:
            source = f.read()
        if len(tokenizer.encode(source)) > MAX_CONTEXT_LENGTH:
            removed_cnt += 1
            os.remove(file)
    print(f'{removed_cnt} files were dropped because they exceed the max context length of {MAX_CONTEXT_LENGTH} tokens.')

def __remove_newlines_at_start(text):
    i = 0
    while text[i] == '\n':
        i += 1
    return text[i:]

# Removes license from file
# Returns True if license was removed, False if no license was found
def __remove_copyright(code_path):
    try:
        src_text = open(code_path, 'r', encoding='utf-8').read()
        src_text = __remove_newlines_at_start(src_text)
        comments = comment_parser.extract_comments_from_str(src_text, mime='application/javascript')

        if len(comments) > 0:
            if comments[0]._multiline:
                license_text = comments[0].text()
                src_text = src_text.replace(license_text, '')
                src_text = src_text.replace('/**/','')
                # Remove newlines at start of file
                src_text = __remove_newlines_at_start(src_text)
                # Write to file
                with open(code_path, 'w', encoding='utf-8') as f:
                    f.write(src_text)
                return True
            else:
                src_lines = open(code_path, 'r', encoding='utf-8').readlines()
                i = 0
                # While lines start with //
                while src_lines[i].strip().startswith('//'):
                    i += 1
                # Remove empty lines
                while src_lines[i].strip() == '':
                    i += 1
                # Remove lines
                src_lines = src_lines[i:]
                # Write to file
                with open(code_path, 'w', encoding='utf-8') as f:
                    f.writelines(src_lines)    
                return True
        return False                
    except:
        print(f'Comment parser failed on {code_path}')
        return False

# Removes files that cannot be parsed by js parser
# Returns True if file was removed, False if file was parsed successfully
def __remove_if_not_parse(code_path):
    try:
        parse(open(code_path, 'r', encoding='utf-8').read())
        return False
    except:
        os.remove(code_path)
        return True

def remove_copyright():
    files = glob.glob("data/dataset/*.js")
    with Pool(6) as p:
        list(tqdm(p.imap(__remove_copyright, files), total=len(files)))
    
def remove_unparsable():
    files = glob.glob("data/dataset/*.js")
    with Pool(6) as p:
        res = list(tqdm(p.imap(__remove_if_not_parse, files), total=len(files)))
    print(f'{sum(res)} files were removed because they could not be parsed.')
    
def rename_invalid_files():
    files = glob.glob("data/dataset/*.js")
    files = [os.path.basename(x) for x in files]
    for file_name in tqdm(files):
        name_without_ext = '.'.join(file_name.split('.')[:-1])
        if re.match('\d+\.', file_name) or not is_valid_filename(name_without_ext):
            # Rename file to random string
            new_file_name = random_str(10) + '.js'
            os.rename(f'data/dataset/{file_name}', f'data/dataset/{new_file_name}')

if __name__ == "__main__":
    #write_medium_length_sources()
    #sample_random_sources()
    #copy_files_to_dataset()
    #remove_files_exceeding_context()
    #remove_unparsable()
    #remove_copyright()
    rename_invalid_files()