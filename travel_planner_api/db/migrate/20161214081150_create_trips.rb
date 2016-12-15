class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :destination, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.text :comment

      t.timestamps
    end
  end
end
