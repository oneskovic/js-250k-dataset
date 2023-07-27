import os
import glob
from tqdm import tqdm
import random
import shutil
from multiprocessing import Pool

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
    return shutil.copy(*args)

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
    # with Pool(6) as p:
    #     list(tqdm(p.imap(__copy_star, zip(sources, [destination]*len(sources))), total=len(sources)))
    for source in tqdm(sources):
        shutil.copy(source, destination)
    

if __name__ == "__main__":
    # write_medium_length_sources()
    # sample_random_sources()
    copy_files_to_dataset()