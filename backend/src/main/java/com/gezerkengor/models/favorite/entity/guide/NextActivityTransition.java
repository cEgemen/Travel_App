package com.gezerkengor.models.favorite.entity.guide;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NextActivityTransition {
      private String method;
      private String estimatedTime;
      private String nextLocation;
      private String nextAddress;
}
