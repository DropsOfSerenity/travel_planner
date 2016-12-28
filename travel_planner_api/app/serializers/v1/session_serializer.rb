module V1
  class SessionSerializer < ActiveModel::Serializer
    attributes :id, :email, :access_token, :role
  end
end
