// TapTap 后台开通广告后，在打包前配置公开的激励视频广告位 ID。
// 未配置或宿主未提供 tap API 时，入口会说明原因，不发放奖励。
window.MoneyTalentAds={
  async showRewarded(){
    const unitId=window.MONEY_TALENT_AD_UNIT_ID;
    const tapApi=window.tap;
    if(!unitId||!tapApi||typeof tapApi.createRewardedVideoAd!=='function'){
      throw new Error('当前版本尚未开通广告，人生报告仍可正常查看和重开。');
    }
    const ad=tapApi.createRewardedVideoAd({adUnitId:unitId});
    return new Promise(async(resolve,reject)=>{
      let settled=false;
      const clean=()=>{if(ad.offClose)ad.offClose(onClose);if(ad.offError)ad.offError(onError)};
      const finish=(value,error)=>{if(settled)return;settled=true;clean();error?reject(error):resolve(value)};
      const onClose=res=>finish(res?.isEnded===true);
      const onError=()=>finish(false,new Error('广告暂不可用，请稍后再试。'));
      ad.onClose(onClose);
      if(ad.onError)ad.onError(onError);
      try{await ad.show()}catch{
        try{await ad.load();await ad.show()}catch{finish(false,new Error('广告加载失败，请稍后再试。'))}
      }
    });
  }
};

