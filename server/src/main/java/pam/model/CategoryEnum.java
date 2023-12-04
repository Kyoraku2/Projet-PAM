package pam.model;


public enum CategoryEnum {

    FOOD,
    RESTAURANT,
    BAR,
    CAFE,

    ENTERTAINMENT,
    CULTURE,
    PARK,
    AMUSEMENT_PARK,
    SPORT,
    CINEMA,
    THEATRE,
    MUSEUM,
    MONUMENT,
    RELIGIOUS_SITE,
    HISTORICAL_SITE,
    ZOO,
    CASINO,
    NIGHTCLUB,
    LIBRARY,

    SHOP,
    MALL,
    MARKET,

    HOTEL,

    GAZ_STATION,

    HEALTH,

    WORK,

    PARKING,
    PUBLIC_TRANSPORT,

    OTHER;

    public static boolean contains(String s){
        for(CategoryEnum c : CategoryEnum.values()){
            if(c.name().equals(s) || c.name().toLowerCase().equals(s)){
                return true;
            }
        }
        return false;
    }

}
