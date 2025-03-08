package com.gezerkengor.services.favorite;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gezerkengor.models.favorite.dto.DTOFavorite;
import com.gezerkengor.models.favorite.entity.Favorite;
import com.gezerkengor.repositories.FavoriteRepository;

@Service
public class FavoriteService implements IFavoriteService{

    @Autowired
    private FavoriteRepository repo;

    @Override
    public Map<String, ?> saveFavoriteGuide(Favorite favorite) {
         repo.save(favorite);
         return Map.of("message","guide is saved successfuly.");
    }

    @Override
    public Map<String, ?> deleteFavoriteGuide(String id) {
        List<Favorite> result = repo.findByFavOwner(id);
        return Map.of("message","owner fav guides fetched.","data",result);
    }

    @Override
    public Map<String, ?> getFavoriteGuide(String id,int mod) {
        Sort sort;
        if(mod == 1)
        {
            sort = Sort.by(Sort.Order.asc("updateDate"));
        }
        else{
            sort = Sort.by(Sort.Order.desc("updateDate"));  
        }  
        List<DTOFavorite> result = repo.findAllUserGuides(id,sort);
        System.out.println("result : "+result);
        return Map.of("message","owner fav guides fetched.","data",result);
    }

    
    
}
