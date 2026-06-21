package util;

import java.util.concurrent.ThreadLocalRandom;

import  Enum.TypeBien;

public class RandomGenerator {
    public static double generateSurface(TypeBien type) {

        double min;
        double max;

        switch (type) {
            case STUDIO:
                min = 15; max = 40;
                break;
            case APPARTEMENT:
                min = 40; max = 120;
                break;
            case MAISON:
                min = 80; max = 250;
                break;
            case VILLA:
                min = 120; max = 400;
                break;
            case BUREAU:
            case COMMERCE:
                min = 30; max = 1000;
                break;
            case TERRAIN:
                min = 200; max = 5000;
                break;
            default:
                min = 20; max = 200;
        }

        return round(ThreadLocalRandom.current().nextDouble(min, max));
    }

    private static double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
