class AddLatitudeAndLongitudeToCity < ActiveRecord::Migration[5.0]
  def change
    add_column :cities, :latitude, :float
    add_column :cities, :longitude, :float
  end
end
