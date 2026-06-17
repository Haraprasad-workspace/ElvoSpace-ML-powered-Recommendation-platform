import pandas as pd 
import numpy as np 
import matplotlib.pyplot as plt 
import seaborn as sns 
from scipy import sparse
import joblib 
import warnings
warnings.filterwarnings('ignore')


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv("../cleaned Datasets/ProductInfo.csv")

tfidf = TfidfVectorizer(
    stop_words='english' ,
    ngram_range=(1,2), 
    max_features=30000  
)

tfidf_matrix = tfidf.fit_transform(df['tags'])

joblib.dump(tfidf , "../models/tfidf_vectorizer.pkl")
joblib.dump(df , "../models/products.pkl")

sparse.save_npz("../models/tfidf_matrix.npz" , tfidf_matrix)