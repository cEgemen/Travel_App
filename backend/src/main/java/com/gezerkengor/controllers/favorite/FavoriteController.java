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
import com.gezerkengor.models.favorite.entity.Favorite;
import com.gezerkengor.services.favorite.FavoriteService;

import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/api/favorite")
public class FavoriteController extends BaseController<Map<String,?>> implements IFavoriteController {

    @Autowired
    private FavoriteService service;

    @Override
    @PostMapping("/save")
    public ResponseEntity<?> saveFavoriteGuide(@RequestBody Favorite favorite) {
        log.info("favorite  : "+favorite.toString());
        System.out.println("favorite : "+favorite);
        Map<String,?> result = service.saveFavoriteGuide(favorite);
        return okResponse(result);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteFavoriteGuide(@PathVariable String id) {
       Map<String , ?> result = service.deleteFavoriteGuide(id);
       return okResponse(result);
    }

    @Override
    @GetMapping("user/{id}")
    public ResponseEntity<?> getFavoriteGuide(@PathVariable String id,@RequestParam int mod) {
        System.out.println("favOwner id : "+id+" --- mod : "+mod);
        Map<String,?> result = service.getFavoriteGuide(id,mod);
        return okResponse(result);
    }
    
    

}
