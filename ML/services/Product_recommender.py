import pandas as pd 
import numpy as np
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"
import joblib 
from scipy import sparse

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

def recommend(product_id):
    matched_data = df[
        df['product Id'] == product_id
    ]

    if matched_data.empty:
        return pd.DataFrame()
    

    idx = matched_data.index[0] 

    scores = cosine_similarity(
        tfidf_matrix[idx] ,
        tfidf_matrix
    ).flatten()

    top_idx = np.argsort(scores)[::-1][1:51]

    recommendations = df.iloc[top_idx].copy()
    recommendations = rank_recommendation(recommendations , scores , top_idx)

    return recommendations[['product Id' ,'Final Score'  , 'similarity','Popularity Score' , 'Value Score']].head(25).to_dict("records")
