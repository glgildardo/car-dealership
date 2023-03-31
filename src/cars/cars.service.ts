import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
        // { id: uuid(), brand: 'Honda', model: 'Civic' },
        // { id: uuid(), brand: 'Jeep', model: 'Cheroke' }
    ];


    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(value => value.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car);

        return createCarDto;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carDb = this.findOneById(id);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDb = {...carDb,...updateCarDto,id,}
                return carDb;
            }
            return car;
        });

        return carDb;
    }

    delete(id: string) {

        const car = this.findOneById(id);

        const i = this.cars.indexOf(car);
        this.cars.splice(i, 1)

        return;
    }

    fillsCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
