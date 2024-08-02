export interface Datasheet {
    hp: number
    engine: string
    fuel: string
    consumption: string
    torque: string
    max_speed: string
    weight: string
    kilometers: number
    features: string[]
    drivetrain: string
    transmission: string
  }

export interface Cars {
  id: string
  chasis: string
  brand: string
  model: string
  year: number
  price: number
  color: string[]
  condition: string
  photos: string[]
  datasheet: Datasheet
}
  
  export interface SellerInfo {
    name: string
    contact: string
    address: string
  }
  
  export interface Car {
    id: number
    chasis: string
    brand: string
    model: string
    year: number
    price: number
    color: string[]
    condition: string
    datasheet: Datasheet
    license_plate: string
    date_added: string
    photos: string[]
    seller_info: SellerInfo
    warranty_info: string
  }