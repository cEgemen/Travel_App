package com.gezerkengor.controllers.favorite;

import org.springframework.http.ResponseEntity;

import com.gezerkengor.models.favorite.entity.Favorite;

public interface IFavoriteController {
    
    public ResponseEntity<?> saveFavoriteGuide(Favorite favorite);

    public ResponseEntity<?> deleteFavoriteGuide(String id);

    public ResponseEntity<?> getFavoriteGuide(String id,int mod);

}
