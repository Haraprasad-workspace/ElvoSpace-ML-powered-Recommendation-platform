from pydantic import BaseModel

class ProductRequest(BaseModel):
    product_id : str 

class SearchRequest(BaseModel):
    query : str