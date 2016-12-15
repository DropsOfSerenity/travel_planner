module V1
  class SessionSerializer < ActiveModel::Serializer
    attributes :id, :email, :access_token
  end
end
