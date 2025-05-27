package com.gezerkengor.controllers.favorite;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.models.favorite.entity.guide.FavoriteGuide;
import com.gezerkengor.models.favorite.entity.place.FavoritePlace;
import com.gezerkengor.services.favorite.FavoriteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController extends BaseController<Map<String,?>> implements IFavoriteController {

    @Autowired
    private FavoriteService service;

    @Override
    @PostMapping("/save/guide")
    public ResponseEntity<?> saveFavoriteGuide(@Valid @RequestBody FavoriteGuide favoriteGuide) {
        System.out.println("favorite : "+favoriteGuide);
        Map<String,?> result = service.saveFavoriteGuide(favoriteGuide);
        return okResponse(result);
    }

    @Override
    @DeleteMapping("/delete/guide/{id}")
    public ResponseEntity<?> deleteFavoriteGuide(@PathVariable String id) {
       Map<String , ?> result = service.deleteFavoriteGuide(id);
       return okResponse(result);
    }

    @Override
    @GetMapping("/user/guide/{id}")
    public ResponseEntity<?> getOwnerFavoriteGuide(@PathVariable String id,@RequestParam int mod) {
        System.out.println("favOwner id : "+id+" --- mod : "+mod);
        Map<String,?> result = service.getOwnerFavoriteGuide(id,mod);
        return okResponse(result);
    }

    @Override
    @GetMapping("/guide/{id}")
    public ResponseEntity<?> getFavoriteGuide(@PathVariable String id) {
        Map<String,?> result = service.getFavoriteGuide(id);
        return okResponse(result);
    }

    @Override
    @PostMapping("/save/place")
    public ResponseEntity<?> saveFavoritePlace(@RequestBody FavoritePlace favoritePlace) {
        System.out.println("favoritePlace : "+favoritePlace);
        Map<String,?> result = service.saveFavoritePlace(favoritePlace);
        return okResponse(result);
    }

    @Override
    @DeleteMapping("/delete/place/{id}")
    public ResponseEntity<?> deleteFavoritePlace(@PathVariable String id) {
        Map<String,?> result = service.deleteFavoritePlace(id);
        return okResponse(result);
    }

    @Override
    @GetMapping("/user/place/{id}")
public ResponseEntity<?> getOwnerFavoritePlace(@PathVariable String id,@RequestParam int mod) {
        System.out.println("owner id : "+id+" and mod : "+mod);
        Map<String,?> result = service.getOwnerFavoritePlace(id,mod);
        return okResponse(result);
    }

    @Override
    @GetMapping("/place/{id}")
    public ResponseEntity<?> getFavoritePlace(@PathVariable String id) {
        Map<String,?> result = service.getFavoritePlace(id);
        return okResponse(result);
    }
    
}
