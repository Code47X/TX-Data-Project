class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string :city
      t.integer :population
      t.integer :violent_crime
      t.integer :murder_and_nonnegligent_manslaughter
      t.integer :rape_revised_definition
      t.integer :rape_legacy_definition
      t.integer :robbery
      t.integer :aggravated_assault
      t.integer :property_crime
      t.integer :burglary
      t.integer :larceny_theft
      t.integer :motor_vehicle_theft
      t.integer :arson

      t.timestamps
    end
  end
end
