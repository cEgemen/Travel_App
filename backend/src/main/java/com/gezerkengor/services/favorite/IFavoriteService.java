package com.gezerkengor.services.favorite;

import java.util.Map;

import com.gezerkengor.models.favorite.entity.guide.FavoriteGuide;
import com.gezerkengor.models.favorite.entity.place.FavoritePlace;

public interface IFavoriteService {
    

   public Map<String,?> saveFavoriteGuide(FavoriteGuide favoriteGuide);

   public Map<String , ?> deleteFavoriteGuide(String id);

   public Map<String,?> getOwnerFavoriteGuide(String id,int mod);

   public Map<String,?> getFavoriteGuide(String id);

   public Map<String,?> saveFavoritePlace(FavoritePlace favoritePlace);

   public Map<String,?> deleteFavoritePlace(String id);

   public Map<String,?> getOwnerFavoritePlace(String id,int mod);

   public Map<String,?> getFavoritePlace(String id);

}
