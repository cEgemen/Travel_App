package com.gezerkengor.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.gezerkengor.models.favorite.dto.place.DTOOwnerFavoritePlace;
import com.gezerkengor.models.favorite.entity.place.FavoritePlace;


@Repository
public interface FavoritePlaceRepository extends MongoRepository<FavoritePlace, String> {
    
     @Query(value="{'favOwner':?0}")
     List<FavoritePlace> getOwnerFavPlace(String id);

     @Query(value="{'favOwner':?0}",fields="{'id':1,'imgUrl':1,'name':1,'location':1,'updatedDate':1}")
     List<DTOOwnerFavoritePlace> getOwnerFavPlace(String id,Sort sort);

}
