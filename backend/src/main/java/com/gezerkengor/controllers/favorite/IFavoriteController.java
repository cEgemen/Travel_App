package com.gezerkengor.controllers.favorite;

import org.springframework.http.ResponseEntity;

import com.gezerkengor.models.favorite.entity.guide.FavoriteGuide;
import com.gezerkengor.models.favorite.entity.place.FavoritePlace;

public interface IFavoriteController {
    
    public ResponseEntity<?> saveFavoriteGuide(FavoriteGuide favoriteGuide);

    public ResponseEntity<?> deleteFavoriteGuide(String id);

    public ResponseEntity<?> getOwnerFavoriteGuide(String id,int mod);

    public ResponseEntity<?> getFavoriteGuide(String id);

    public ResponseEntity<?> saveFavoritePlace(FavoritePlace favoritePlace);

    public ResponseEntity<?> deleteFavoritePlace(String id);

    public ResponseEntity<?> getOwnerFavoritePlace(String id,int mod);

    public ResponseEntity<?> getFavoritePlace(String id);

}
