package com.gezerkengor.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.gezerkengor.models.favorite.dto.DTOFavorite;
import com.gezerkengor.models.favorite.entity.Favorite;

@Repository
public interface FavoriteRepository extends MongoRepository<Favorite,String> {
    
     List<Favorite> findByFavOwner(String id);

     @Query(value = "{'favOwner':?0 }", fields = "{ 'id': 1, 'metadata': 1, 'createDate': 1 , 'updateDate': 1}")
     List<DTOFavorite> findAllUserGuides(String id);

     @Query(value = "{'favOwner':?0 }", fields = "{ 'id': 1, 'metadata': 1, 'createDate': 1 , 'updateDate': 1}")
     List<DTOFavorite> findAllUserGuides(String id ,Sort sort);

}
