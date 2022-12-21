const padding = 2;
const gameSpriteSheetData_json = {
  
  heart                         : {
    /*  sprites  */
    heart_red_down              : [(32 + padding) * 0, 0, 32, 32, 1],
    heart_red_right             : [(32 + padding) * 1, 0, 32, 32, 1],
    heart_red_left              : [(32 + padding) * 2, 0, 32, 32, 1],
    heart_red_up                : [(32 + padding) * 3, 0, 32, 32, 1],
    heart_blue_down             : [(32 + padding) * 0, 32 + padding, 32, 32, 1],
    heart_blue_right            : [(32 + padding) * 1, 32 + padding, 32, 32, 1],
    heart_blue_left             : [(32 + padding) * 2, 32 + padding, 32, 32, 1],
    heart_blue_up               : [(32 + padding) * 3, 32 + padding, 32, 32, 1],

    /*  animations  */
    heart_rotation              : [0, 0, 32 + padding, 32 + padding, 4],
  },
  
  gasterBlaster_middle          : {
    /*  sprites  */
    gasterBlaster_attackBefore  : [(172 + padding) * 0, 0, 172, 228, 1],
    gasterBlaster_attackAfter   : [(172 + padding) * 5, 0, 172, 228, 1],

    /*  animations  */
    gasterBlaster_attack        : [0, 0, 172 + padding, 228 + padding, 6],
  },

  gasterBlaster_half            : {
    /*  sprites  */
    gasterBlaster_half_before   : [(86 + padding) * 0, 0, 86, 228, 1],
    gasterBlaster_half_after    : [(86 + padding) * 5, 0, 86, 228, 1],

    /*  animations  */
    gasterBlaster_half_attack   : [0, 0, 86 + padding, 228 + padding, 6],
  },
  
  hbone                         : {
    /*  sprites  */
    hbone                       : [0, 0, 48, 48, 1],
    hbone_up                    : [0, 0, 12, 20, 1],
    hbone_down                  : [36, 0, 12, 20, 1],
  },
  
  vbone                         : {
    /*  sprites  */
    vbone                       : [0, 0, 48, 48, 1],
    vbone_up                    : [0, 0, 20, 12, 1],
    vbone_down                  : [0, 36, 20, 12, 1],
  },

  hbone_blue                    : {
    /*  sprites  */
    hbone_blue                  : [0, 0, 48, 48, 1],
    hbone_blue_up               : [0, 0, 12, 20, 1],
    hbone_blue_down             : [36, 0, 12, 20, 1],
  },
  
  vbone_blue                    : {
    /*  sprites  */
    vbone_blue                  : [0, 0, 48, 48, 1],
    vbone_blue_up               : [0, 0, 20, 12, 1],
    vbone_blue_down             : [0, 36, 20, 12, 1],
  },

  sans                          : {
    /*  sprites */
    sans_face_0                 : [(96 + padding) * 0, 0, 96, 90, 1],
    sans_face_1                 : [(96 + padding) * 1, 0, 96, 90, 1],
    sans_face_2                 : [(96 + padding) * 2, 0, 96, 90, 1],
    sans_face_3                 : [(96 + padding) * 3, 0, 96, 90, 1],
    sans_face_4                 : [(96 + padding) * 4, 0, 96, 90, 1],
    sans_face_5                 : [(96 + padding) * 5, 0, 96, 90, 1],
    sans_face_6                 : [(96 + padding) * 6, 0, 96, 90, 1],
    sans_face_7                 : [(96 + padding) * 7, 0, 96, 90, 1],
    sans_face_8                 : [(96 + padding) * 8, 0, 96, 90, 1],
    sans_face_9                 : [(96 + padding) * 9, 0, 96, 90, 1],
    sans_face_10                : [(96 + padding) * 10, 0, 96, 90, 1],
    sans_face_11                : [(96 + padding) * 11, 0, 96, 90, 1],
    sans_face_12                : [(96 + padding) * 12, 0, 96, 90, 1],

    sans_head_sweat_0           : [(96 + padding) * 0, 92, 96, 28, 1],
    sans_head_sweat_1           : [(96 + padding) * 1, 92, 96, 28, 1],
    sans_head_sweat_2           : [(96 + padding) * 2, 92, 96, 28, 1],

    sans_body_0                 : [0, 120, 162, 75, 1],
    sans_damaged_body_0         : [294, 92, 153, 104, 1],
    sans_damaged_body_1         : [687, 92, 156, 75, 1],
    
    sans_leg_stand              : [490, 92, 132, 69, 1],
    sans_leg_sit                : [883, 92, 155, 51, 1],
    
    /*  animations  */
    sans_swing_down             : [0, 200, 186 + padding, 210 + padding, 5],
    sans_swing_up               : [0, 200, 186 + padding, 210 + padding, -5],
    sans_swing_right            : [0, 412, 288 + padding, 144 + padding, 5],
    sans_swing_left             : [0, 412, 288 + padding, 144 + padding, -5],
  },

  attack                        : {
    /*  animations  */
    attack_anim                 : [0, 0, 34 + padding, 204, 6]
  }
};

export { padding, gameSpriteSheetData_json };