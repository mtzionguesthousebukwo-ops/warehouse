<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Region;
use App\Models\District;
use App\Models\Agency;
use App\Models\Warehouse;
use App\Models\Period;
use App\Models\WarehouseCapacity;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Add a Region
        $central = Region::create(['name' => 'Central']);

        // Add a District (linked to region)
        $kampala = District::create([
            'name' => 'KAMPALA',
            'region_id' => $central->id,
            // optional if you have geojson file in database/geojson/kampala.json
            'geojson' => file_exists(database_path('geojson/kampala.json')) 
                          ? file_get_contents(database_path('geojson/kampala.json')) 
                          : null,
        ]);

        // Add an Agency
        $agency = Agency::create(['name' => 'Health Agency']);

        // Add a Warehouse
        $warehouse = Warehouse::create([
            'name' => 'Kampala Warehouse',
            'district_id' => $kampala->id,
            'agency_id' => $agency->id,
            'latitude' => 0.3136,
            'longitude' => 32.5811,
        ]);

        // Add a Period
        $period = Period::create(['name' => '2014_2015']);

        // Add Warehouse Capacity
        WarehouseCapacity::create([
            'warehouse_id' => $warehouse->id,
            'period_id' => $period->id,
            'capacity' => 500,
        ]);
    }
}
