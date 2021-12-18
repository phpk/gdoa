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
    <div class="am-modal-hd">新朋友
        <a href="javascript: void(0)" class="am-close" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd" style="padding: 15px;">
        <ul class="" style="max-height: 400px;overflow-y: auto;overflow-x: hidden;margin: 0;padding: 0;text-align: left;">
            <?php if (count($friend)>0){foreach ($friend as $k => $v){?>
                <li data-id="<?php echo $v['id']?>" class="user-list">
                    <div class="user-info">
                        <img src="<?php echo $v['head_img']?>" alt="">
                        <div class="user-truename"><?php echo $v['truename']?></div>
                    </div>
                    <div class="add-user-btn">
                        <?php if ($v['status'] == 0){?>
                            <div  onclick="doAddFriendOk(<?php echo $v['id']?>)" class="user_time" style="background-color: #59923d;color: #fff;padding: 0 8px;margin-top: 8px;cursor: pointer">接受</div>
                        <?php }else{?>
                            <div class="user_time" style="padding: 0 3px;margin-top: 8px">已添加</div>
                        <?php }?>
                    </div>
                </li>
            <?php }}else{?>
            <li class="user-list">
                暂无数据
            </li>
            <?php }?>
        </ul>
    </div>
    <input type="hidden" name="<?php echo $csrf['name'];?>" value="<?php echo $csrf['hash'];?>">
</div>
<script>
    function doAddFriendOk(uid) {
        var msg_data = '{"type":"add_friend_ok","to_user_id": "' + uid + '"}';
        ws.send(msg_data);
        $("#modal-box").modal('close');
    }
</script>