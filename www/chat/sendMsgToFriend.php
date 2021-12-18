<style>
    .am-modal-dialog ul {
        padding: 5px !important;
    }
    .am-modal-dialog ul > li{
        background: #fff;
        display: flex;
        padding: 5px;
        border-radius: 5px;
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
    .am-modal-dialog .add-user:hover, .am-modal-footer:hover{
        background: #129611 !important;
        cursor: pointer;
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
<style>
    .am-modal-dialog .checkbox {
        position: relative;
        height: 20px;
        width: 20px;
        float: right;
        cursor: pointer;
    }
    .am-modal-dialog .checkbox input[type='checkbox'] {
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        opacity: 0;
    }
    .am-modal-dialog .checkbox label {
        position: absolute;
        left: 30px;
        top: 0;
        height: 20px;
        line-height: 20px;
    }
    .am-modal-dialog .checkbox label:before {
        content: '';
        position: absolute;
        left: -30px;
        top: 0;
        width: 20px;
        height: 20px;
        border: 1px solid #ddd;
        border-radius: 50%;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;

    }
    .am-modal-dialog .checkbox label:after {
        content: '';
        position: absolute;
        left: -22px;
        top: 3px;
        width: 6px;
        height: 12px;
        border: 0;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
    }
    .am-modal-dialog .checkbox input[type='checkbox']:checked + label:before {
        background: #1AAD19;
        border-color: #4cd764;
    }
    .am-modal-dialog .checkbox input[type='checkbox']:checked + label:after {
        background: #1AAD19;
    }
</style>
<div class="am-modal-dialog" style="width: 400px;background: #F3F3F3">
    <div class="am-modal-hd">转发消息
        <a href="javascript: void(0)" class="am-close" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd" style="padding: 15px;">
        <form class="am-form am-form-inline" style="margin-bottom: 15px;">
            <div class="col-sm-10" style="display: inline-block;">
                <input type="text" class="am-form-field" style="font-size: 1.2rem;" placeholder="联系人">
            </div>
            <div class="col-sm-2 col-md-pull-10" style="display: inline-block;text-align: right;">
                <button type="submit" class="am-btn am-btn-xs" style="padding: .5em 1.2em;background: #1AAD19;color: #fff;">查找</button>
            </div>
        </form>
        <ul class="" style="max-height: 400px;overflow-y: auto;overflow-x: hidden;margin: 0;padding: 0;text-align: left;">
            <?php foreach ($friend as $k => $v){?>
                <li data-id="<?php echo $v['id']?>" class="user-list">
                    <div class="user-info">
                        <img src="<?php echo $v['head_img']?>" alt="">
                        <div class="user-truename"><?php echo $v['truename']?></div>
                    </div>
                    <div class="add-user-btn checkbox">
                        <div class="checkbox">
                            <input type="checkbox" name="to_user_id[]" value="<?php echo $v['id']?>" id="a_<?php echo $v['id']?>">
                            <label for="a_<?php echo $v['id']?>"></label>
                        </div>
                    </div>
                </li>
            <?php }?>
        </ul>
    </div>
    <div class="am-modal-footer" onclick="sendMsgToFriends()" style="display: block;background: #1AAD19;color: #fff;text-align: center;line-height: 44px;font-size: 15px;transition: background-color .3s ease-out,border-color .3s ease-out;">
        确定
    </div>
    <input type="hidden" name="<?php echo $csrf['name'];?>" value="<?php echo $csrf['hash'];?>">
</div>
<script>
    //添加朋友
    function sendMsgToFriends() {
        let oInput = $("input[type='checkbox']:checked");
        if (oInput.length == 0)
        {
            return false;
        }
        let to_user_id = "";
        for (let i = 0; i < oInput.length; i++)
        {
            if (i == oInput.length - 1)
            {
                to_user_id += oInput[i].value;
            }else {
                to_user_id += oInput[i].value + ",";
            }

        }
        var msg_data = '{"type":"send_msg_to_friends", "msg_id": "<?php echo $msg_id?>","to_user_id": "'+to_user_id+'", "sign":"0"}';
        ws.send(msg_data);
        $("#modal-box").modal('close');
    }
</script>