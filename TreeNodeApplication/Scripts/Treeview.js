$(document).ready(function () {
    $(".collapsible").live("click", function (e) { //bura da class ı collapsible olan yani modelimizde ki span ın classı collapsiple ye tıklandığında 
        e.preventDefault(); // preventDefaultu eventi engellemek için kullandık.


        var this1 = $(this); //Tıklanan itemi alıyorum
        var data = {
            pid: $(this).attr('pid')    //parent id ataması yaptık var değişkenine parent idsi pid olan dataları yükledik.
        };

        var isLoaded = $(this1).attr('data-loaded'); //Data tüklendi mi yüklenmedi mi kontrol ediyorz.

        if (isLoaded == "false") {
            $(this1).addClass("loadingP");
            $(this1).removeClass("collapse");

            //Now Load Data Here

            $.ajax({
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
                                $("<li></li>").append(
                                    "<span class='collapse collapsible' data-loaded='false' pid='" + ele.MenuID + "'>&nbsp;</span>" +
                                    "<span><a href='" + ele.NavURL + "'>" + ele.MenuName + "</a></span>"
                                )
                                )

                        });

                        $(this1).parent().append($ul);
                        $(this1).addClass('collapse');
                        $(this1).toggleClass('collapse expand');
                        $(this1).closest('li').children('ul').slideDown();
                    }

                    else {
                        //sub Menu yoksa

                        $(this1).css({ 'dislay': 'inline-block', 'width': '15px' });
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