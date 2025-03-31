package com.gezerkengor.services.favorite;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gezerkengor.base.baseErrors.CustomException;
import com.gezerkengor.base.baseErrors.ErrorsEnum;
import com.gezerkengor.models.favorite.dto.DTOFavorite;
import com.gezerkengor.models.favorite.dto.DTOOwnerFavorite;
import com.gezerkengor.models.favorite.entity.Favorite;
import com.gezerkengor.repositories.FavoriteRepository;

@Service
public class FavoriteService implements IFavoriteService{

    @Autowired
    private FavoriteRepository repo;

    @Override
    public Map<String, ?> saveFavoriteGuide(Favorite favorite) {
         Favorite fav =  repo.save(favorite);
         return Map.of("message","guide is saved successfuly.","data",fav.getId());
    }

    @Override
    public Map<String, ?> deleteFavoriteGuide(String id) {
        repo.deleteById(id);;
        return Map.of("message","guide is deleted.");
    }

    @Override
    public Map<String, ?> getOwnerFavoriteGuide(String id,int mod) {
        Sort sort;
        if(mod == 1)
        { 
            sort = Sort.by(Sort.Order.asc("updateDate"));
        }
        else{
            sort = Sort.by(Sort.Order.desc("updateDate"));  
        }  
        List<DTOOwnerFavorite> result = repo.findAllUserGuides(id,sort);
        System.out.println("result : "+result);
        return Map.of("message","owner fav guides fetched.","data",result);
    }

    @Override
    public Map<String, ?> getFavoriteGuide(String id) {
        Optional<Favorite> result = repo.findById(id);
        if(!result.isPresent())
        {
            throw new CustomException(ErrorsEnum.FAVORITE_NOT_FOUND);
        }
        Favorite resultData = result.get();
        DTOFavorite data = new DTOFavorite().setId(resultData.getId())
                                            .setFavOwner(resultData.getFavOwner())
                                            .setMetadata(resultData.getMetadata())
                                            .setItinerary(resultData.getItinerary())
                                            .setCreateDate(resultData.getCreateDate())
                                            .setUpdateDate(resultData.getUpdateDate());
        return Map.of("message","owner fav guides fetched.","data",data);
    }

    
    
}
