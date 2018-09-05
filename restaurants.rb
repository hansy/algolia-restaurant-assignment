require 'csv'
require 'json'

def create_restaurant_info_index
  r_index = {}

  CSV.foreach('restaurants_info.csv', headers: true, col_sep: ';') do |row|
    id = row[0].to_i

    r_index[id] = {
      cuisine:             row[1],
      rating:              row[2].to_i,
      num_reviews:         row[3].to_i,
      neighborhood:        row[4],
      phone_number_pretty: row[5],
      price_range:         row[6],
      dining_style:        row[7],
    }
  end

  return r_index
end

def get_restaurants_list
  restaurants_list_file = File.read 'restaurants_list.json'
  return JSON.parse restaurants_list_file
end

def merge_restaurant_records
  for restaurant in @restaurants_list
    id = restaurant['objectID']
    restaurant.merge!(@restaurants_info_index[id])
  end
end

def output_master_restaurants_list(filename)
  File.open(filename, "w") do |f|
    f.write(@restaurants_list.to_json)
  end
end

@restaurants_info_index = create_restaurant_info_index
@restaurants_list       = get_restaurants_list
merge_restaurant_records
output_master_restaurants_list('master_restaurants_list.json')
