from transformers import AutoTokenizer
import matplotlib.pyplot as plt
import pandas as pd
from tqdm import tqdm
import glob
from multiprocessing import Pool
MAX_PLOT_TOKENS = 10000

tokenizer = AutoTokenizer.from_pretrained('bigcode/starcoder')
def get_token_len(source):
    with open(source, 'r', encoding='utf-8') as f:
        source = f.read()
    tokens = tokenizer.encode(source)
    return len(tokens)

if __name__ == '__main__':
    files = glob.glob("data/dataset/*.js")
    with Pool(6) as p:
        token_lens = list(tqdm(p.imap(get_token_len, files), total=len(files)))
    token_lens = [x for x in token_lens if x < MAX_PLOT_TOKENS]

    plt.xlabel('Token count (source only)')
    plt.ylabel('Frequency')
    plt.title('Token count distribution')
    plt.hist(token_lens, bins=40)
    plt.show()
