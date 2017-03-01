# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', '2013_TX_Crime.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = City.new
  c.city                                 = row['city']
  c.population                           = row['population']
  c.violent_crime                        = row["violent crime"]
  c.murder_and_nonnegligent_manslaughter = row["murder and nonnegligent manslaughter"]
  c.rape_revised_definition              = row["rape (revised definition)"]
  c.rape_legacy_definition               = row["rape (legacy definition)"]
  c.robbery                              = row["robbery"]
  c.aggravated_assault                   = row["aggravated_assault"]
  c.property_crime                       = row["property crime"]
  c.burglary                             = row["burglary"]
  c.larceny_theft                        = row["larceny-theft"]
  c.motor_vehicle_theft                  = row["motor vehicle theft"]
  c.arson                                = row["arson"]

  c.save
end
