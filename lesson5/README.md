# Notes App - A React app with Rails API server backend

In this lesson, React component __Notes.js__ is loaded by Rails, which
also provides a JSON API back end. The advantage of integrating React
and Rails, as opposed to hosting each at a separate URL, is that
the server doesn't need to support cross-origin resource sharing (CORS)
requests, since both the Rails server and React front end share the
same origin (i.e., `http://localhost:3001`).

This lesson was initialized with the following commands. Note that
rails is not invoked without command-line option `--api` so that Rails
can create a container (i.e., HTML `div` element via `react_component`
call) into which the React App is rendered.


``` shell
rails new lesson5 --webpack=react
cd lesson5
echo "gem 'react-rails'" >>Gemfile
bundle
rails g react:install
rails g controller Welcome index
rails g model Note title:string body:text
rails db:migrate
```

Routes are added for the API server in __config/routes.rb__:

```
Rails.application.routes.draw do
  get 'welcome/index'
  resources :notes
  root 'welcome#index'
end
```

The file __app/javascript/packs/application.js__ created by
`rails g react:install`  is pulled into the application layout so that
Rails views can load React components located in folder
__app/javascript/components__. To do this, before
`</head>` in file __app/views/layouts/application.html.erb__, add the
line:
```
    <%= javascript_pack_tag 'application' %>
```

React component __Notes.js__ is installed in folder
__app/javascript/components__ and loaded in
__app/views/welcome/index.html.erb__,  with the following contents:

``` html
<div class="App-header">
  <h1>Notes</h1>
</div>
<%= react_component 'Notes' %>
```

Add CSS file __Notes.css__ to folder __app/assets/stylesheets__.
Run the application:

```
rails s -p 3001
```

Visit the Notes app in the browser at web address: `http://localhost:3001`.
