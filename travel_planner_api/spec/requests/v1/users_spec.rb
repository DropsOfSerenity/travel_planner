require 'rails_helper'

describe 'Users API' do

  describe 'POST /v1/users' do
    it 'creates a user' do
      post '/v1/users',
        params: { user: { email: 'email@example.com', password: 'password' } }

      expect(response.code.to_i).to eq(201)
      expect(json['email']).to eq('email@example.com')
    end

    it 'informs of errors' do
      post '/v1/users', params: { user: { password: 'password' } }
      json = JSON.parse(response.body)

      expect(response.code.to_i).to eq(422)
      expect(json['error']).not_to be_nil
    end
  end

  describe 'PATCH /v1/users/1' do
    it 'allows updating of users parameters' do
      user = create(:user)

      patch "/v1/users/#{user.id}",
        params: { user: { email: 'newfunny@email.com' } },
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['email']).to eq('newfunny@email.com')
    end

    it 'only allows admins to update role' do
      admin = create(:user, role: :admin)
      user = create(:user)

      patch "/v1/users/#{user.id}",
        params: { user: { role: 'admin' } },
        headers: { 'Authorization' => admin.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['role']).to eq('admin')
    end

    it 'does not allow manager to update role' do
      manager = create(:user, role: :manager)

      patch "/v1/users/#{manager.id}",
        params: { user: { role: 'admin' } },
        headers: { 'Authorization' => manager.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['role']).to eq('manager')
    end
  end

  describe 'DELETE /v1/users/1' do
    it 'allow deletion of a users params' do
      user = create(:user)

      delete "/v1/users/#{user.id}",
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['email']).to eq(user.email)
    end

    it 'cannot delete another user' do
      user = create(:user)
      protected_user = create(:user)

      delete "/v1/users/#{protected_user.id}",
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(401)
    end
  end

  describe 'GET /v1/users' do
    it 'only lists users as manager or admin' do
      create_list(:user, 2)
      admin = create(:user, :admin)

      get '/v1/users',
        headers: { 'Authorization' => admin.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json.count).to eq(3)
    end

    it 'doesnt allow listing as user' do
      create_list(:user, 2)
      user = create(:user)

      get '/v1/users',
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(401)
    end
  end

  describe 'GET /v1/users/1' do
    it 'allows you user to view themselves' do
      user = create(:user)

      get "/v1/users/#{user.id}",
        headers: { 'Authorization' => user.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['email']).to eq(user.email)
    end

    it 'allows a manager/admin to view anyone' do
      user = create(:user)
      admin = create(:user, :manager)

      get "/v1/users/#{user.id}",
        headers: { 'Authorization' => admin.access_token }

      expect(response.code.to_i).to eq(200)
      expect(json['email']).to eq(user.email)
    end

  end

end
