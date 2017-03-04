# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170304020656) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string  "city"
    t.integer "population"
    t.integer "violent_crime"
    t.integer "murder_and_nonnegligent_manslaughter"
    t.integer "rape_revised_definition"
    t.integer "rape_legacy_definition"
    t.integer "robbery"
    t.integer "aggravated_assault"
    t.integer "property_crime"
    t.integer "burglary"
    t.integer "larceny_theft"
    t.integer "motor_vehicle_theft"
    t.integer "arson"
    t.float   "latitude"
    t.float   "longitude"
  end

end
