require 'rails_helper'

describe 'Trips API' do

  describe 'POST /v1/trips' do
    it 'creates a trip' do
      user = create(:user)

      post '/v1/trips',
        headers: { 'Authorization' => user.access_token },
        params: { trip: { destination: Faker::Pokemon.location,
                          start_date: Date.today,
                          end_date: Date.today } }

      expect(response.code.to_i).to eq(201)
      expect(json['id']).not_to be_nil
    end
  end

  describe 'PATCH /v1/trips/1' do
    it 'allows updating of trip parameters' do
      user = create(:user)
      trip = create(:trip, user: user)

      patch "/v1/trips/#{trip.id}",
        params: { trip: { destination: 'the moon' } },
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['destination']).to eq('the moon')
    end
  end

  describe 'GET /v1/trips' do
    it 'lists the users trips' do
      user = create(:user, :with_trips)

      get '/v1/trips', headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json.count).to eq(3)
    end
  end

  describe 'GET /v1/trips/1' do
    it 'gets an individual users trip' do
      user = create(:user)
      trip = create(:trip, user: user)

      get "/v1/trips/#{trip.id}", headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['id']).to eq(trip.id)
    end
  end

  describe 'DELETE /v1/trips/1' do
    it 'deletes a users trip' do
      user = create(:user)
      trip = create(:trip, user: user)

      delete "/v1/trips/#{trip.id}",
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
    end
  end


end
