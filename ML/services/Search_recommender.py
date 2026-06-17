import pandas as pd 
import numpy as np
import warnings
warnings.filterwarnings('ignore')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import joblib 
from scipy import sparse

df = joblib.load("../models/products.pkl")
tfidf = joblib.load("../models/tfidf_vectorizer.pkl")
tfidf_matrix =  sparse.load_npz("../models/tfidf_matrix.npz")


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
    return recommendations.head(10)
