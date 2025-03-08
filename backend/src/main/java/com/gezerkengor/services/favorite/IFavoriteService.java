package com.gezerkengor.services.favorite;

import java.util.Map;

import com.gezerkengor.models.favorite.entity.Favorite;

public interface IFavoriteService {
    

   public Map<String,?> saveFavoriteGuide(Favorite favorite);

   public Map<String , ?> deleteFavoriteGuide(String id);

   public Map<String,?> getFavoriteGuide(String id,int mod);

}
