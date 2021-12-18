<style>
    .am-modal-dialog ul {
        padding: 5px !important;
    }
    .am-modal-dialog ul > li{
        /*padding: 0 5px 10px 5px;*/
        /*width: 100px;*/
        /*height: 120px;*/
        background: #fff;
        display: flex;
        /*cursor: pointer;*/
        padding: 5px;
        border-radius: 5px;
        /*border: 1px solid #3BB4F2;*/
        margin-bottom: 10px;
        align-items: center;
    }
    .am-modal-dialog ul > li:hover{
        box-shadow: 0 0 2px #3BB4F2;
    }
    .am-modal-dialog img {
        border: 1px solid #CCC;
        background: #FFF;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
    }
    .am-modal-dialog .user-info{
        width: 100px;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        align-items: center;
    }
    .am-modal-dialog .add-user-btn{
        flex: 1;
        text-align: right;
        padding-right: 5px;
    }
    .am-modal-dialog .add-user{
        background: #1AAD19;
        color: #fff;
        font-size: 12px;
        padding: 1px 4px;
        border-radius: 3px;
        cursor: pointer;
    }
    .am-modal-dialog .add-user:hover{
        background: #129611 !important;
    }
    .am-modal-dialog .user-truename{
        font-size: 13px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
        box-sizing: border-box;
    }
    .am-modal-dialog button:hover{
        background: #129611 !important;
    }
</style>
<div class="am-modal-dialog" style="width: 400px;background: #F3F3F3">
    <div class="am-modal-hd">添加好友
        <a href="javascript: void(0)" class="am-close" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd" style="padding: 15px;">
        <form class="am-form am-form-inline" style="margin-bottom: 15px;" onsubmit="return false;">
            <div class="col-sm-10" style="display: inline-block;">
                <input type="text" onkeyup="searchUser(this)" class="am-form-field" style="font-size: 1.2rem;" placeholder="请输入微信号/会员名">
            </div>
            <div class="col-sm-2 col-md-pull-10" style="display: inline-block;text-align: right;">
                <button class="am-btn am-btn-xs" style="padding: .5em 1.2em;background: #1AAD19;color: #fff;">搜索</button>
            </div>
        </form>
        <ul class="search-user-list" style="max-height: 400px;overflow-y: auto;overflow-x: hidden;margin: 0;padding: 0;text-align: left;">
            <?php foreach ($friend as $k => $v){?>
            <li data-id="<?php echo $v['id']?>" class="user-list">
                <div class="user-info">
                    <img src="<?php echo $v['head_img']?>" alt="">
                    <div class="user-truename"><?php echo $v['truename']?></div>
                </div>
                <div class="add-user-btn">
                    <span class="add-user" onclick="sendToUser(<?php echo $v['id']?>)">添加</span>
                </div>
            </li>
            <?php }?>
        </ul>
    </div>
    <input type="hidden" name="<?php echo $csrf['name'];?>" value="<?php echo $csrf['hash'];?>">
</div>
<script>
    //添加朋友
    function sendToUser(uid) {
        var msg_data = '{"type":"add_friend","to_user_id": "' + uid + '"}';
        ws.send(msg_data);
    }


    function searchUser(obj)
    {
        let value = $(obj).val();
        $.get('<?php echo site_url("home/chat/getSearchFriend")?>?val='+value, function(data){
            let html = '<li class="user-list">暂无数据</li>';
            for (var i = 0; i < data.length; i++) {
                html += `<li data-id="`+data[i].id+`" class="user-list">
                <div class="user-info">
                    <img src="`+data[i].head_img+`" alt="">
                    <div class="user-truename">`+data[i].truename+`</div>
                </div>
                <div class="add-user-btn">
                    <span class="add-user" onclick="sendToUser(`+data[i].id+`)">添加</span>
                </div>
            </li>`;
            };
            $(".search-user-list").html(html);
        }, 'json')
    }
</script>