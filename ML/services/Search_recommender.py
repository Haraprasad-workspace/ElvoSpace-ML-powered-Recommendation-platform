import pandas as pd 
import numpy as np
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import joblib 
from scipy import sparse

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


df = joblib.load(MODEL_DIR / "products.pkl")
tfidf = joblib.load(MODEL_DIR /"tfidf_vectorizer.pkl")
tfidf_matrix =  sparse.load_npz(MODEL_DIR /"tfidf_matrix.npz")

def rank_recommendation(recommendations , scores , top_indx):
    recommendations = recommendations.copy()

    recommendations['similarity'] = scores[top_indx]
    recommendations['popularity_norm'] = (
        recommendations['Popularity Score']
        / recommendations['Popularity Score'].max()
    )

    recommendations['value_norm'] = (
        recommendations['Value Score']
        / recommendations['Value Score'].max()
    )

    recommendations['Final Score'] = (
        0.80 * recommendations['similarity']
        + 0.13 * recommendations['popularity_norm']
        + 0.07 * recommendations['value_norm']
    )

    return recommendations.sort_values(
        by='Final Score',
        ascending=False
    )

def recommendBykeywords(text):

    query_vector = tfidf.transform([text]) 

    scores = cosine_similarity(
        query_vector ,
        tfidf_matrix
    ).flatten()

    top_idx = np.argsort(scores)[::-1][:50]

    recommendations = df.iloc[top_idx].copy()
    recommendations = rank_recommendation(recommendations , scores , top_idx)
    return recommendations['Product Id' , 'similarity','Popularity Score' , 'Value Score'].head(25).to_dict("records")
