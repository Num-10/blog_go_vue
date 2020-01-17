<template>
<!--主体-->
    <section class="main">
        <input hidden id="user_id" name="user_id" value="">
        <input hidden id="article_id" name="article_id" value="24">
        <div class="left-box">

            <div class="article-container">
                <div class="sort-box">

                    <span class="location fl c-666">
                        <span class="at-sort-detail c-666">当前位置：
                            <a href="/">首页</a> >
                            <a href="/front/category/后台">后台</a> >
                            <a href="/front/label/Python">Python</a>
                        </span>
                    </span>
                </div>
                <div class="article-content markdown-body">

                    <h1 style="margin: 10px 0">如何在Django中新建一个App，连接Mysql数据库，并获取数据。</h1>
                    <div class="writer-info">
                        <span style="margin: 5px 0;">作者: </span>
                        <span id="writer">admin </span>
                        <span id="write-time">2018-08-02 15:07:15</span>
                        <span>阅读(<span id="read-number">65</span>)</span>
                        <span>评论(<span id="read-number">0</span>)</span>
                    </div>
                    <div class="toc">
                        <ul>
                            <li><a href="#_1">一. 前言</a></li>
                            <li><a href="#app">二. 创建App</a></li>
                            <li><a href="#_2">三. 连接数据库</a></li>
                            <li><a href="#model">四. 反向生成Model</a></li>
                            <li><a href="#_3">五. 从数据库获取数据</a></li>
                            <li><a href="#_4">六. 在网页中显示</a></li>
                            <li><a href="#_5">七. 最后</a></li>
                        </ul>
                    </div>

                    <h1 id="_1">一. 前言</h1>
                    <p>浏览文章之前请确认你的电脑已经安装好了python环境（包括pip），且已经成功新建了一个可以正常运行的Django项目，若未新建，请查看我之前写的一篇文章——<a
                            href="https://www.jianshu.com/p/795d1768f875">如何在Pycharm中新建一个Django项目</a> </p>
                    <hr />
                    <h1 id="app">二. 创建App</h1>
                    <p><strong>1. 方法一：</strong> </p>
                    <ul>
                        <li>
                            <p>点击pycharm下方的<strong>terminal</strong>导航栏。<br />
                                <img alt="点击pycharm下方的terminal导航栏"
                                    src="https://i.loli.net/2019/07/29/5d3efe6b56a5c83711.png" /> </p>
                        </li>
                        <li>
                            <p>在控制台输入<strong>python manage.py startapp
                                    app001</strong>，app001指的是app的名称，可以<strong>自定义</strong>。这句命令行的含义是创建名称为app001的App。<br />
                                <img alt="输入python manage.py startapp app001命令"
                                    src="https://i.loli.net/2019/07/29/5d3efe6e173d398327.png" /> </p>
                        </li>
                        <li>
                            <p>查看项目根目录，检查app001是否创建成功。<br />
                                <img alt="查看项目根目录，检查app001是否创建成功"
                                    src="https://i.loli.net/2019/07/29/5d3efe6e5257d35224.png" /> </p>
                        </li>
                        <li>
                            <p>在<strong>settings.py</strong>中注册App，打开与项目名称相同的目录，找到其中的<strong>settings.py</strong>文件，双击编辑，找到App配置区域，如下所示。
                            </p>
                        </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="n">INSTALLED_APPS</span> <span class="o">=</span> <span class="p">[</span>
    <span class="s1">&#39;simpleui&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.admin&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.auth&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.contenttypes&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.sessions&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.messages&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.staticfiles&#39;</span><span class="p">,</span>
<span class="p">]</span>
</pre>
                    </div>

                    <ul>
                        <li>我们需要将刚刚创建的App加入到配置文件中，其他配置保持默认即可，如下所示。 </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="n">INSTALLED_APPS</span> <span class="o">=</span> <span class="p">[</span>
    <span class="s1">&#39;simpleui&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.admin&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.auth&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.contenttypes&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.sessions&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.messages&#39;</span><span class="p">,</span>
    <span class="s1">&#39;django.contrib.staticfiles&#39;</span><span class="p">,</span>
    <span class="s1">&#39;app001&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="err">添加的</span><span class="n">App</span>
<span class="p">]</span>
</pre>
                    </div>

                    <p><strong>2. 方法二：</strong><br />
                        - 建议初学者采用<strong>方法一</strong>，方法二需要一定的命令行知识，这不是整篇文章的重点。在这里不细说，大概讲一下流程。<br />
                        - 首先用cd命令行进入项目根目录。<br />
                        - 在根目录下执行与方法一相同的<strong>python manage.py startapp app001</strong>的创建App命令行操作。<br />
                        - 检查项目根目录下的app001是否创建成功。<br />
                        - 在settings.py中注册App </p>
                    <hr />
                    <h1 id="_2">三. 连接数据库</h1>
                    <ul>
                        <li>
                            <p>利用pip命令安装mysqlclient，这是python3用来连接MySQL的驱动库，不安装将无法连接。 </p>
                        </li>
                        <li>
                            <p><strong>下面是具体安装步骤</strong>：<br />
                                切换至pycharm的<strong>terminal</strong>导航栏，在命令行窗口输入<strong>pip install
                                    mysqlclient</strong>，如下图所示。<br />
                                <img alt="利用pip命令安装mysqlclient"
                                    src="https://i.loli.net/2019/07/29/5d3efe6f6dac099933.png" /> </p>
                        </li>
                        <li>
                            <p>进入项目根目录下与你<strong>项目名称相同</strong>的文件夹，找到settings.py，双击编辑，如下图所示。<br />
                                <img alt="settings.py" src="https://i.loli.net/2019/07/29/5d3efe6e4450a26166.png" />
                            </p>
                        </li>
                        <li>
                            <p>找到<strong>DATABASES</strong>数据库配置区域，如下所示。 </p>
                        </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="n">DATABASES</span> <span class="o">=</span> <span class="err">{</span>
    <span class="s1">&#39;default&#39;</span><span class="p">:</span> <span class="err">{</span>
        <span class="s1">&#39;ENGINE&#39;</span><span class="p">:</span> <span class="s1">&#39;django.db.backends.sqlite3&#39;</span><span class="p">,</span>
        <span class="s1">&#39;NAME&#39;</span><span class="p">:</span> <span class="n">os</span><span class="p">.</span><span class="n">path</span><span class="p">.</span><span class="k">join</span><span class="p">(</span><span class="n">BASE_DIR</span><span class="p">,</span> <span class="s1">&#39;db.sqlite3&#39;</span><span class="p">),</span>
    <span class="err">}</span>
<span class="err">}</span>
</pre>
                    </div>

                    <ul>
                        <li>因为要连接MySQL数据库，因此需要修改数据库配置，将其修改为如下所示。 </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="n">DATABASES</span> <span class="o">=</span> <span class="err">{</span>
    <span class="s1">&#39;default&#39;</span><span class="p">:</span> <span class="err">{</span>
        <span class="s1">&#39;ENGINE&#39;</span><span class="p">:</span> <span class="s1">&#39;django.db.backends.mysql&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="n">mysql驱动</span>
        <span class="s1">&#39;NAME&#39;</span><span class="p">:</span> <span class="s1">&#39;test&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="err">数据库名称</span>
        <span class="s1">&#39;USER&#39;</span><span class="p">:</span> <span class="s1">&#39;root&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="err">登录帐号</span>
        <span class="s1">&#39;PASSWORD&#39;</span><span class="p">:</span> <span class="s1">&#39;123456&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="err">登录密码</span>
        <span class="s1">&#39;HOST&#39;</span><span class="p">:</span> <span class="s1">&#39;127.0.0.1&#39;</span><span class="p">,</span>  <span class="o">#</span> <span class="err">主机地址</span>
        <span class="s1">&#39;PORT&#39;</span><span class="p">:</span> <span class="s1">&#39;3306&#39;</span>  <span class="o">#</span> <span class="err">端口</span>
    <span class="err">}</span>
<span class="err">}</span>
</pre>
                    </div>

                    <ul>
                        <li>其中NAME为数据库名称，USER表示登录账户名，PASSWORD为登录密码，HOST表示主机地址（127.0.0.1表示本机），PORT表示端口，默认为3306。一般只需修改<strong>NAME，USER，PASSWORD</strong>，使其与你电脑上的环境一致，其他保持默认即可。
                        </li>
                    </ul>
                    <hr />
                    <h1 id="model">四. 反向生成Model</h1>
                    <ul>
                        <li>
                            <p>在pycharm的<strong>terminal</strong>命令行窗口中输入<strong>python manage.py
                                    inspectdb</strong>。<br />
                                <img alt="图片.png" src="https://i.loli.net/2019/07/29/5d3efe6ec856556999.png" /> </p>
                        </li>
                        <li>
                            <p>如上图所示，<strong>db_table='user'</strong>表示的意思是这个实体类与名称为user这个表相关联。 </p>
                        </li>
                        <li>
                            <p><strong>python manage.py
                                    inspectdb</strong>命令行执行的功能是把数据库中的所有表反向生成实体类，一张表对应一个实体类，你只需要将生成的实体类信息粘贴到对应App目录下的models.py即可。
                            </p>
                        </li>
                        <li>
                            <p>将窗口中的整个class粘贴至<strong>app01</strong>目录下的<strong>models.py</strong>中。（<strong>models.py</strong>用于存放实体类）<br />
                                <img alt="图片.png" src="https://i.loli.net/2019/07/29/5d3efe6f6ea2635870.png" /> </p>
                        </li>
                    </ul>
                    <hr />
                    <h1 id="_3">五. 从数据库获取数据</h1>
                    <ul>
                        <li>
                            <p>在app001下新建一个文件夹，名称为<strong>templates</strong>，不能为其他名字，否则会报错。这是Django的规定，app目录下的temlates文件夹中用来存放模板文件（.html文件）。
                            </p>
                        </li>
                        <li>
                            <p>在此<strong>templates</strong>文件夹下新建一个名称为<strong>index.html</strong>的网页（待会儿用来显示数据库返回的数据），如下图所示。
                            </p>
                        </li>
                    </ul>
                    <p><img alt="图片.png" src="https://i.loli.net/2019/07/29/5d3efe6f626ec84835.png" /> </p>
                    <ul>
                        <li>
                            <p>进入app001目录下的<strong>views.py</strong>文件，双击编辑 </p>
                        </li>
                        <li>
                            <p>在<strong>views.py</strong>中定义一个函数，名称为<strong>get_user</strong>，如下所示。 </p>
                        </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="kn">from</span> <span class="nn">django.shortcuts</span> <span class="kn">import</span> <span class="n">render</span>
<span class="kn">from</span> <span class="nn">app001.models</span> <span class="kn">import</span> <span class="n">User</span>

<span class="k">def</span> <span class="nf">get_user</span><span class="p">(</span><span class="n">request</span><span class="p">):</span>
    <span class="n">user_list</span> <span class="o">=</span> <span class="n">User</span><span class="o">.</span><span class="n">objects</span><span class="o">.</span><span class="n">all</span><span class="p">()</span>
    <span class="k">return</span> <span class="n">render</span><span class="p">(</span><span class="n">request</span><span class="p">,</span> <span class="s1">&#39;index.html&#39;</span><span class="p">,</span> <span class="p">{</span><span class="s1">&#39;user_list&#39;</span><span class="p">:</span> <span class="n">user_list</span><span class="p">})</span>
</pre>
                    </div>
                    <ul>
                        <li>user_list = User.objects.all()表示从数据库user表中拿到所有的用户信息，并将其赋值给user_list这个变量，等价于SQL语句 </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="k">select</span> <span class="o">*</span> <span class="k">from</span> <span class="k">user</span>
</pre>
                    </div>

                    <ul>
                        <li>
                            <p>render的可以理解成携带三个参数的跳转。第一个参数是请求request，第二个参数是需要渲染的模板文件（跳转到哪一个.html文件中），第三个参数是字典对象（用来存放渲染模板的数据），前两个参数必须给定，不能省略，第三个参数可以省略（表示不携带数据的跳转）。
                            </p>
                        </li>
                        <li>
                            <p>进入与项目根目录同名文件夹下的<strong>urls.py</strong>，在<strong>urls.py</strong>中注册该函数和请求路径，如下所示。 </p>
                        </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="kn">from</span> <span class="nn">django.contrib</span> <span class="kn">import</span> <span class="n">admin</span>
<span class="kn">from</span> <span class="nn">django.urls</span> <span class="kn">import</span> <span class="n">path</span>
<span class="kn">from</span> <span class="nn">app001</span> <span class="kn">import</span> <span class="n">views</span>

<span class="n">urlpatterns</span> <span class="o">=</span> <span class="p">[</span>
    <span class="n">path</span><span class="p">(</span><span class="s1">&#39;admin/&#39;</span><span class="p">,</span> <span class="n">admin</span><span class="o">.</span><span class="n">site</span><span class="o">.</span><span class="n">urls</span><span class="p">),</span>

    <span class="n">path</span><span class="p">(</span><span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="n">views</span><span class="o">.</span><span class="n">get_user</span><span class="p">)</span>  <span class="c1"># 添加路径对应函数，&#39;&#39;表示运行首页访问路径  </span>
<span class="p">]</span>
</pre>
                    </div>

                    <ul>
                        <li>path()函数有两个参数，第一个参数为请求路径，指定为空字符串表示项目运行时首页对应的内容，第二个参数表示调用函数。<strong>path('', views.get_user)
                            </strong>表示当浏览器请求首页，调用views.py中的get_user函数，执行get_user函数中的动作。（<strong>注意
                                views.get_user的最后无需加()，否则会报错</strong>） </li>
                    </ul>
                    <hr />
                    <h1 id="_4">六. 在网页中显示</h1>
                    <ul>
                        <li>编辑app001中templates目录下的<strong>index.html</strong>文件。 </li>
                    </ul>
                    <div class="codehilite">
                        <pre><span></span><span class="o">&lt;!</span><span class="nv">DOCTYPE</span> <span class="nv">html</span><span class="o">&gt;</span>
<span class="o">&lt;</span><span class="nv">html</span> <span class="nv">lang</span><span class="o">=</span><span class="s2">&quot;</span><span class="s">en</span><span class="s2">&quot;</span><span class="o">&gt;</span>
<span class="o">&lt;</span><span class="nv">head</span><span class="o">&gt;</span>
    <span class="o">&lt;</span><span class="nv">meta</span> <span class="nv">charset</span><span class="o">=</span><span class="s2">&quot;</span><span class="s">UTF-8</span><span class="s2">&quot;</span><span class="o">&gt;</span>
    <span class="o">&lt;</span><span class="nv">title</span><span class="o">&gt;</span><span class="nv">Title</span><span class="o">&lt;/</span><span class="nv">title</span><span class="o">&gt;</span>
<span class="o">&lt;/</span><span class="nv">head</span><span class="o">&gt;</span>
<span class="o">&lt;</span><span class="nv">body</span><span class="o">&gt;</span>
{<span class="o">%</span> <span class="k">for</span> <span class="nv">user</span> <span class="nv">in</span> <span class="nv">user_list</span> <span class="o">%</span>}
    <span class="o">&lt;</span><span class="nv">h1</span><span class="o">&gt;</span><span class="o">&lt;/</span><span class="nv">h1</span><span class="o">&gt;</span>
{<span class="o">%</span> <span class="nv">endfor</span> <span class="o">%</span>}
<span class="o">&lt;/</span><span class="nv">body</span><span class="o">&gt;</span>
<span class="o">&lt;/</span><span class="nv">html</span><span class="o">&gt;</span>
</pre>
                    </div>

                    <blockquote>
                        <p><strong>{% for user in user_list %} {% endfor %}</strong>
                            表示循环作用域，遍历user_list列表，user表示每次循环的变量。 <strong></strong>
                            表示获取user对象中的user_name。若对django的模板不太了解，可以浏览我的博客——<a
                                href="http://www.zhaoyangkun.top/front/articleDetail/20/">苍茫误此生博客</a>，我在那里写了一些关于django模板的基础知识。
                        </p>
                    </blockquote>
                    <ul>
                        <li>
                            <p>最后运行项目，点击pycharm右上角的绿色箭头。<br />
                                <img alt="2019-07-18 16-58-31屏幕截图.png"
                                    src="https://i.loli.net/2019/07/29/5d3efe6d3cea935972.png" /> </p>
                        </li>
                        <li>
                            <p>在浏览器地址栏中输入<strong>http://127.0.0.1:8000/</strong>访问即可，具体效果图如下。<br />
                                <img alt="图片.png" src="https://i.loli.net/2019/07/29/5d3efe6ee317a61299.png" /> </p>
                        </li>
                    </ul>
                    <hr />
                    <h1 id="_5">七. 最后</h1>
                    <p>这是我第一次写那么长的博客，还是有点累的。博客中如果有什么不足和错误，希望水友可以指出来。最后播个插曲，最近自己用django建了个网站，有兴趣的水友可以帮忙点击一下。网址是<a
                            href="http://www.zhaoyangkun.top/">苍茫误此生博客</a>，谢谢大家。<strong>转载请注明出处</strong>，<a
                            href="[https://www.jianshu.com/p/a15b135137a9](https://www.jianshu.com/p/a15b135137a9)">简书-苍茫误此生-如何在Django中新建一个App，连接Mysql数据库，并获取数据。</a>
                    </p>
                </div>

                <div class="prev-next">
                    <div class="p-div">
                        <span class="fl">上一篇：</span>
                        <a class="one-line-overflow fl" href="https://www.zhaoyangkun.top/front/articleDetail/23/"
                            id="prev-a">Django中ajax上传图片详细步骤</a>
                    </div>

                    <div class="n-div">
                        <span class="fl">下一篇：</span>
                        <a class="one-line-overflow fl" href="https://www.zhaoyangkun.top/front/articleDetail/29/" id="next-a">CentOS 利用 Docker 部署
                            pipe 具体步骤</a>
                    </div>
                </div>
            </div>

            <div class="comment-container" style="margin-top: 20px;">

                <div class="sort-box">
                    <span class="at-sort-s fl"><a style="box-sizing: content-box;"
                            class="at-sort-comment-a c-666">评论</a></span>
                    <span class="location fl c-666"><a class="at-sort-detail c-666"></a> </span>
                </div>

                <div class="text-area-holder">
                    <div id="vditor">

                    </div>

                </div>

                <div class="button-line">
                    <span id="error-info"></span>
                    <button type="button" id="publish-btn" onclick="">发布</button>
                </div>

                <div class="total-count">
                    共 <span id="comment-count">2</span> 条评论
                </div>

                <div class="comment-item">
                    <div class="user-img-box">
                        <img src="" id="user-img" alt="">
                    </div>
                    <div class="comment-box">
                        <div class="user-info">
                            <span class="user-name">admin</span>
                            <span class="publish-time">2019年08月12日 11:14:48</span>
                        </div>

                        <div class="reply-box">
                            <div class="user-info">
                                <span class="reply-user-name">@admin</span>
                                <span class="publish-time">2019年08月12日 11:11:39</span>
                            </div>
                            <p class="comment-content c-666" style="padding-bottom: 5px">
                                蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。
                            </p>

                        </div>

                        <p class="comment-content c-666">
                        </p>
                        <p>唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。唉，说实话做博客还是花了蛮多心思的，就是没什么流量，不管了，做好自己就行了。</p>
                        <p></p>

                        <div class="icon-line">
                            <a href="javascript:void(0)" class="delete-icon"
                                style="background-image: url('../static/img/delete.svg');" onclick=""></a>

                            <a href="javascript:void(0)" class="comment-icon"
                                style="background-image: url('../static/img/comment.svg');"
                                onclick="show_reply(this)"></a>
                            <span class="reply_count c-666">0</span>

                            <a href="javascript:void(0)" class="liked-icon"
                                style="background-image: url('../static/img/liked.svg');" onclick=""></a>

                            <span class="liked_count c-666">0</span>
                        </div>

                        <div class="reply-holder" style="display: none;">
                            <input class="reply-btn" type="button" onclick="" value="回复">
                        </div>

                    </div>
                </div>

                <div class="comment-item">
                    <div class="user-img-box">

                        <img src="" id="user-img" alt="">

                    </div>
                    <div class="comment-box">

                        <div class="user-info">
                            <span class="user-name">admin</span>
                            <span class="publish-time">2019年08月12日 11:11:39</span>
                        </div>

                        <p class="comment-content c-666">
                        </p>
                        <p>蛮想出一个重装win10的详细教程，但是身边没有电脑给我做测试😂 。</p>
                        <p></p>

                        <div class="icon-line">

                            <a href="javascript:void(0)" class="delete-icon"
                                style="background-image: url('../static/img/delete.svg');" onclick=""></a>

                            <a href="javascript:void(0)" class="comment-icon"
                                style="background-image: url('../static/img/comment.svg');"
                                onclick="show_reply(this)"></a>
                            <span class="reply_count c-666">1</span>

                            <a href="javascript:void(0)" class="liked-icon"
                                style="background-image: url('../static/img/liked-on.svg');" onclick=""></a>

                            <span class="liked_count c-666">1</span>
                        </div>

                        <div class="reply-holder" style="display: none;">
                            <input class="reply-btn" type="button" onclick="reply_comment(this,8,22,30)" value="回复">
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="right-box">

            <div class="column-holder" style="margin-top: 20px">
                <ul class="column_box">
                    <li class="column-title b-b-ece c-29">猜你喜欢</li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/32/">Django常用ORM方法</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/31/">Windows系统优化一</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/30/">Win10常用操作技巧</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/22/">做博客网站的初衷</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/19/">Django模板介绍和基本变量语法</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/18/">为什么选择Django来建站</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/17/">Python递归遍历图片文件</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/23/">Django中ajax上传图片详细步骤</a>
                    </li>

                </ul>
            </div>

            <div class="column-holder" style="margin-top: 20px">
                <ul class="column_box">
                    <li class="column-title b-b-ece c-29">点击排行</li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/22/">做博客网站的初衷</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/23/">Django中ajax上传图片详细步骤</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/24/">如何在Django中新建一个App，连接Mysql数据库，并获取数据。</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/32/">Django常用ORM方法</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/21/">Django模板语言——if-else</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/17/">Python递归遍历图片文件</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/20/">Django模板语言——for</a>
                    </li>

                    <li class="column-category b-b-ece">
                        <a href="/front/articleDetail/29/">CentOS 利用 Docker 部署 pipe 具体步骤</a>
                    </li>

                </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
@import "../assets/css/article-detail.css";
@import "../assets/css/code.css";
@import "../assets/css/github-markdown.css";
@import "../assets/css/vditor.classic.css";
</style>
