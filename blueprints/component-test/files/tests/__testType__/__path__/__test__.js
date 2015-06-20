import { moduleForComponent, test } from 'ember-qunit';
<%= additionalImports %>

moduleForComponent('<%= componentPathName %>', '<%= friendlyTestDescription %>', {
  <%= testTypeDefinition %>
});

test('it renders', function(assert) {
  <%= testContent %>
});
