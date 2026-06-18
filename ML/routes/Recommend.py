from fastapi import APIRouter

from schemas.recommendation import(
    ProductRequest , 
    SearchRequest
)

from services.Product_recommender import recommend
from services.Search_recommender import recommendBykeywords
from services.Product_recommender import rank_recommendation

router = APIRouter(
    prefix="/api/recommend" ,
    tags=['Recommmendations']
)

@router.post("/product")
def Product_recommendation(request : ProductRequest):
    recommendations = recommend(request.product_id)

    return{
        "success" : True ,
        "data" : recommendations
    }

@router.post("/search")
def Search_recommendation(request : SearchRequest):
    recommendations = recommendBykeywords(request.query)
    return{
        "success" : True ,
        "data" : recommendations
    }

