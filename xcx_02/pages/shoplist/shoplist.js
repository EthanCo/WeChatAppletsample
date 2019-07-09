// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts:{},
    //商铺列表数据，默认为空
    shopList:[],
    page:1,
    pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      opts:options
    })

    //获取商铺列表数据
    this.getShopList()
  },

  getShopList : function(){
    wx.request({
      url: 'https://www.liulongbin.top:8081/categories/'+this.data.opts.id+'/shops?_page='+this.data.page+'&_limit='+this.data.pageSize,
      success:(res)=>{
        console.log(res)
        this.setData({
          //赋值
          //shopList:res.data
          //ES6 拼接后再赋值
          shopList:[...this.data.shopList,...res.data]
        })
      },
      complete:()=>{
        //只要完成请求，就立即关闭下拉刷新的效果
        wx.stopPullDownRefresh()
      }})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新了")
    this.setData({
      page:1,
      shopList:[]
    })

    this.getShopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("需要加载下一页数据了")
    //1.先让页码值+1
    this.setData({
      page:this.data.page+1
    })

    //2.调用刚才的getShapList函数，
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})