import request from '@/utils/request'

/**
 * 获取频道列表
 * 1.用户登录，获取登录用户保存的频道列表
 *2. 用户没有登录，获取默认的频道列表
 */
export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels ')
}
// 获取所有频道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
// 删除用户的指定频道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
// 添加用户的指定频道
// id频道的id,seq是当前项的序列号
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [{
      id,
      seq
    }]
  })
}
