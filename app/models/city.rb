class City < ApplicationRecord
  geocoded_by :full_address
  after_validation :geocode

  def full_address
    return "#{city}, TX"
  end
end
