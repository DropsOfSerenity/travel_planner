require 'rails_helper'

describe 'Plans API' do

  describe 'GET /v1/plans' do
    it 'lists a users trip plan for the coming 30 days' do
      user = create(:user)
      create(:trip, user: user, start_date: 10.days.ago)
      create(:trip, user: user, start_date: 25.days.from_now)
      create(:trip, user: user, start_date: 60.days.from_now)

      get '/v1/plans', headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json.count).to eq(1)
    end
  end

end
