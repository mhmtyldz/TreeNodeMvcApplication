$(document).ready(function () {
    $(".collapsible").live("click", function (e) { //bura da class ı collapsible olan yani modelimizde ki span ın classı collapsiple ye tıklandığında 
        e.preventDefault(); // preventDefaultu eventi engellemek için kullandık.


        var this1 = $(this); //Tıklanan itemi alıyorum
        var data = {
            pid: $(this).attr('pid')    //parent id ataması yaptık var değişkenine parent idsi pid olan dataları yükledik.
        };

        var isLoaded = $(this1).attr('data-loaded'); //Data tüklendi mi yüklenmedi mi kontrol ediyorz.

        if (isLoaded == "false") {
            $(this1).addClass("loadingP");  //Eğer Yüklenmemişse LoadingP yi çalştır
            $(this1).removeClass("collapse"); //Spanda ki collapse yi sil

            

            $.ajax({ //Klasik Ajax ile Get işlemleri
                url: "/Treeview/GetSubMenu",
                type: "GET",
                data: data,
                dataType: "json",
                success: function (d) {
                    $(this1).removeClass("loadingP");
                    if (d.lenght > 0) {
                        var $ul = $("<ul></ul>");
                        $.each(d, function (i, ele) {
                            $ul.append(
                                $("<li></li>").append( // Linin içine foreach le dataları ekliyoruz onu da liste haline gelmesi için ul ye ekliyoruz
                                    "<span class='collapse collapsible' data-loaded='false' pid='" + ele.MenuID + "'>&nbsp;</span>" +
                                    "<span><a href='" + ele.NavURL + "'>" + ele.MenuName + "</a></span>"
                                )
                                )

                        });

                        $(this1).parent().append($ul); //thisin parentina ul yi ekle
                        $(this1).addClass('collapse');
                        $(this1).toggleClass('collapse expand');
                        $(this1).closest('li').children('ul').slideDown(); 
                    }

                    else {
                        //sub Menu yoksa

                        $(this1).css({ 'dislay': 'inline-block', 'width': '15px' }); //calışmazsa css imizi çalştır
                    }

                    $(this1).attr('data-loaded', true);
                }, 
                error: function () {
                    alert("Error!");
                }
            })

        }

        else {
            //Eğer data zaten yüklüyse
            $(this1).toggleClass("collapse expand");
            $(this1).closest('li').children('ul').slideToggle();
        }
    })
});