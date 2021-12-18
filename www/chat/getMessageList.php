<style>
    .am-modal-dialog ul > li{
        display: flex;
        border-bottom: 1px solid #ddd;
        padding: 15px 0;
    }
    .am-modal-dialog .user-head img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        overflow: hidden;
    }
    .am-modal-hd{
        text-align: left;
    }
    .search-msg-list .user-info{
        display: flex;
        align-items: center;
    }
    .search-msg-list .user-info > div{
        flex: 1;
        color: #999;
        font-size: 14px;
    }
    .search-msg-list .user-msg-date{
        text-align: right;
    }
    .search-msg-list .user-msg{
        font-size: 16px;
        color: #000;
    }
    div.line{
        width: 100%;
        height: 1px;
        background: #ddd;
    }
</style>
<div class="am-modal-dialog" style="width: 550px;background: #F3F3F3">
    <div class="am-modal-hd">
        <?php echo $name;?>
        <a href="javascript: void(0)" class="am-close" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd" style="padding:0">
        <form class="am-form am-form-inline" style="padding: 15px 40px;" onsubmit="return false;">
            <div class="col-sm-11" style="display: inline-block;">
                <input type="text" onkeyup="searchMessage(this)" class="am-form-field" style="font-size: 1.2rem;" placeholder="search">
            </div>
            <div class="col-sm-1 col-md-pull-10" style="display: inline-block;text-align: right;">
                <button class="am-btn am-btn-xs" style="padding: .5em 1.2em;background: #1AAD19;color: #fff;">搜索</button>
            </div>
        </form>
        <div class="line"></div>
        <ul class="search-msg-list" style="height: 500px;overflow-y: auto;overflow-x: hidden;margin: 0;padding: 0;text-align: left; padding: 0px 40px;">
            <?php if(count($chat_msg) > 0){ foreach ($chat_msg as $key => $value) {?>
            <li>
                <div class="user-head">
                    <img src="<?php echo $value['head_img']?>" alt="">
                </div>
                <div class="user-body" style="flex: 1;padding-left: 10px;">
                    <div class="user-info">
                        <div class="user-truename"><?php echo $value['truename']?></div>
                        <div class="user-msg-date"><?php echo $value['date_entered']?></div>
                    </div>
                    <div class="user-msg"><?php echo $value['msg']?></div>
                </div>
            </li>
            <?php }}else{?>
                <li class="user-list">暂无数据</li>
            <?php }?>
        </ul>
    </div>
    <input type="hidden" name="<?php echo $csrf['name'];?>" value="<?php echo $csrf['hash'];?>">
    <input type="hidden" value="<?php echo $chat_id;?>" id="msg-chat-id">
</div>
<script>
    $(function(){
        msgBoxToBottom();
    });
    function msgBoxToBottom()
    {
        let msg_box = $(".search-msg-list");
        msg_box[0].scrollTop = msg_box[0].scrollHeight
    }
    function searchMessage(obj)
    {
        let value = $(obj).val();
        let chat_id = $("#msg-chat-id").val();
        $.get('<?php echo site_url("home/chat/getSearchMsg")?>?chat_id='+chat_id+'&val='+value, function(data){
            let html = '<li class="user-list">暂无数据</li>';
            for (var i = 0; i < data.length; i++) {
                html += `<li>
                <div class="user-head">
                    <img src="`+data[i].head_img+`" alt="">
                </div>
                <div class="user-body" style="flex: 1;padding-left: 10px;">
                    <div class="user-info">
                        <div class="user-truename">`+data[i].truename+`</div>
                        <div class="user-msg-date">`+data[i].date_entered+`</div>
                    </div>
                    <div class="user-msg">`+data[i].msg+`</div>
                </div>
            </li>`;
            };
            $(".search-msg-list").html(html);
        }, 'json')
    }
</script>