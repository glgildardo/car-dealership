import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService: CarsService
    ){}

    @Get()
    getAllCars() {
        return  this.carService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        console.log({id})
        return this.carService.findOneById(id);
    }

    @Post()
    createCar( @Body() createCarDto: CreateCarDto) {
        return this.carService.create( createCarDto );
    }

    @Patch(':id')
    updateCar( @Param('id', ParseUUIDPipe) id: string,
               @Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe) id: string) {
        return this.carService.delete(id);
    }
}
