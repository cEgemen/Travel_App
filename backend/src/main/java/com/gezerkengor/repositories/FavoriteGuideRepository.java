package com.gezerkengor.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.gezerkengor.models.favorite.dto.guide.DTOOwnerFavoriteGuide;
import com.gezerkengor.models.favorite.entity.guide.FavoriteGuide;

@Repository
public interface FavoriteGuideRepository extends MongoRepository<FavoriteGuide,String> {
    
     List<FavoriteGuide> findByFavOwner(String id);

     @Query(value = "{'favOwner':?0 }", fields = "{ 'id': 1, 'metadata': 1, 'createDate': 1 , 'updateDate': 1}")
     List<DTOOwnerFavoriteGuide> findAllUserGuides(String id);

     @Query(value = "{'favOwner':?0 }", fields = "{ 'id': 1, 'metadata': 1, 'createDate': 1 , 'updateDate': 1}")
     List<DTOOwnerFavoriteGuide> findAllUserGuides(String id ,Sort sort);

}
