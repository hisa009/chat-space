require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'messageを保存できる場合' do
      it 'textがあれば保存できること' do
        expect(build(:message, picture: nil)).to be_valid
      end

      it 'pictureがあれば保存できること' do
        expect(build(:message, text: nil)).to be_valid
      end

      it 'textとpictureがあれば保存できること' do
        expect(build(:message)).to be_valid
      end
    end

    context 'messageを保存出来ない場合' do
      it 'textとimageが両方空だと保存出来ないこと' do
        message = build(:message, text: nil, picture: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end
    
      it 'user_idが空だと保存出来ないこと' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

      it 'group_idが空だと保存出来ないこと' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
    end
  end
end