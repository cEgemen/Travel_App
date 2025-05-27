package com.gezerkengor.services.favorite;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gezerkengor.base.baseErrors.CustomException;
import com.gezerkengor.base.baseErrors.ErrorsEnum;
import com.gezerkengor.models.favorite.dto.guide.DTOFavoriteGuide;
import com.gezerkengor.models.favorite.dto.guide.DTOOwnerFavoriteGuide;
import com.gezerkengor.models.favorite.dto.place.DTOFavoritePlaces;
import com.gezerkengor.models.favorite.dto.place.DTOOwnerFavoritePlace;
import com.gezerkengor.models.favorite.entity.guide.FavoriteGuide;
import com.gezerkengor.models.favorite.entity.place.FavoritePlace;
import com.gezerkengor.repositories.FavoriteGuideRepository;
import com.gezerkengor.repositories.FavoritePlaceRepository;

@Service
public class FavoriteService implements IFavoriteService{

    @Autowired
    private FavoriteGuideRepository guideRepo;

    @Autowired
    private FavoritePlaceRepository placeRepo;

    @Override
    public Map<String, ?> saveFavoriteGuide(FavoriteGuide favorite) {
         FavoriteGuide fav =  guideRepo.save(favorite);
         fav.getId();
         return Map.of("message","guide is saved successfuly.","data",fav.getId());
    }

    @Override
    public Map<String, ?> deleteFavoriteGuide(String id) {
        guideRepo.deleteById(id);
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
        List<DTOOwnerFavoriteGuide> result = guideRepo.findAllUserGuides(id,sort);
        System.out.println("result : "+result);
        return Map.of("message","owner fav guides fetched.","data",result);
    }

    @Override
    public Map<String, ?> getFavoriteGuide(String id) {
        Optional<FavoriteGuide> result = guideRepo.findById(id);
        if(!result.isPresent())
        {
            throw new CustomException(ErrorsEnum.FAVORITE_GUIDE_NOT_FOUND);
        }
        FavoriteGuide resultData = result.get();
        DTOFavoriteGuide data = new DTOFavoriteGuide().setId(resultData.getId())
                                            .setFavOwner(resultData.getFavOwner())
                                            .setMetadata(resultData.getMetadata())
                                            .setItinerary(resultData.getItinerary())
                                            .setCreateDate(resultData.getCreateDate())
                                            .setUpdateDate(resultData.getUpdateDate());
        return Map.of("message","fav guides fetched.","data",data);
    }

    @Override
    public Map<String, ?> saveFavoritePlace(FavoritePlace favoritePlace) {
           FavoritePlace place = placeRepo.save(favoritePlace);
           return Map.of("message","place is saved successfull.","placeId",place.getId());
    }

    @Override
    public Map<String, ?> deleteFavoritePlace(String id) {
         placeRepo.deleteById(id);
         return Map.of("message","place("+id+") is deleted."); 
    }

    @Override
    public Map<String, ?> getOwnerFavoritePlace(String id,int mod) {
        Sort sort;
        if(mod == 1)
        { 
           sort = Sort.by(Sort.Order.asc("updateDate"));
        }
        else
        {
           sort = Sort.by(Sort.Order.desc("updateDate"));
        }
        List<DTOOwnerFavoritePlace> result = placeRepo.getOwnerFavPlace(id,sort);
        System.out.println("service owner place result : "+result);
        return Map.of("message","owner fav places is fetched.","data",result);
    }

    @Override
    public Map<String, ?> getFavoritePlace(String id) {
        Optional<FavoritePlace> optionalResult = placeRepo.findById(id);
        if(!optionalResult.isPresent())
        {
          throw new CustomException(ErrorsEnum.FAVORITE_PLACE_NOT_FOUND);
        }
        FavoritePlace place = optionalResult.get();
        DTOFavoritePlaces dTOFavoritePlace = new DTOFavoritePlaces()
                                                                    .setId(place.getId())
                                                                    .setName(place.getName())
                                                                    .setLocation(place.getLocation())
                                                                    .setFavOwner(place.getFavOwner())
                                                                    .setSummary(place.getSummary())
                                                                    .setImgUrl(place.getImgUrl())
                                                                    .setLat(place.getLat())
                                                                    .setLon(place.getLon())
                                                                    .setActivities(place.getActivities())
                                                                    .setBestTimeToVisit(place.getBestTimeToVisit())
                                                                    .setLocalTips(place.getLocalTips())
                                                                    .setEstimatedCost(place.getEstimatedCost())
                                                                    .setCreatedDate(place.getCreatedDate())
                                                                    .setUpdatedDate(place.getUpdatedDate());
        return Map.of("message","place("+id+") is fetched.","data",dTOFavoritePlace);                                                            
    }

    
    
}
