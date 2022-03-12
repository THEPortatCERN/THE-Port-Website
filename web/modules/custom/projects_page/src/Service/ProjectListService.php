<?php

namespace Drupal\projects_page\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\image\Entity\ImageStyle;

class ProjectListService {

  /** @var \Drupal\Core\File\FileUrlGeneratorInterface */
  protected $file_url_generator;

  /** @var Drupal\Core\Entity\EntityTypeManagerInterface */
  protected $entity_type_manager;

  public function __construct(EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator) {
    $this->entity_type_manager = $entity_type_manager;
    $this->file_url_generator = $file_url_generator;
  }

  public function getTeaserData() {
    $nodes = $this->entity_type_manager
      ->getStorage('node')
      ->loadByProperties([
        'type' => 'project',
        'status' => 1,
      ]);

    $data = [];
    /** @var \Drupal\node\NodeInterface $node */
    foreach ($nodes as $node) {

      /** @var \Drupal\Core\Field\FieldItemListInterface $field_summary */
      $field_summary = $node->get('field_summary');
      $summary = $field_summary->getValue()[0]['value'];

      $image_url = '';
      $image_alt = '';
      $field_hero_entity = $node->get('field_hero')->entity;
      $field_drawing_entity = $node->get('field_drawing')->entity;
      $image_style = ImageStyle::load('extra_small');
      if (!empty($field_hero_entity)) {
        $image_uri = $field_hero_entity->field_media_image->entity->getFileUri();
        $image_url = $image_style->buildUrl($image_uri);
        $image_alt = $field_hero_entity->field_media_image->alt;
      } elseif (!empty($field_drawing_entity)) {
        $image_uri = $field_drawing_entity->field_media_image->entity->getFileUri();
        $image_url = $image_style->buildUrl($image_uri);
        $image_alt = $field_drawing_entity->field_media_image->alt;
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_teams */
      $field_teams = $node->get('field_teams');
      $teams = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_teams->referencedEntities() as $term) {
        $teams[] = $term->getName();
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_attributes */
      $field_attributes = $node->get('field_attributes');
      $attributes = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_attributes->referencedEntities() as $term) {
        $attributes[] = $term->getName();
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_events */
      $field_events = $node->get('field_events');
      $events = [];
      /** @var Drupal\taxonomy\Entity\Term $term */
      foreach ($field_events->referencedEntities() as $term) {
        $events[] = $term->getName();
      }

      /** @var \Drupal\Core\Field\EntityReferenceFieldItemListInterface $field_events */
      $field_development_goals = $node->get('field_development_goals');
      $sdgs = [];
      /** @var Drupal\taxonomy\Entity\Term $field_development_goals */
      foreach ($field_development_goals->referencedEntities() as $term) {
        $sdgs[] = $term->getName();
      }

      $data[] = [
        'title' => $node->getTitle(),
        'summary' => $summary,
        'page_url' => $node->toUrl()->toString(TRUE)->getGeneratedUrl(),
        'image_src' => $image_url,
        'image_alt' => $image_alt,
        'teams' => $teams,
        'attributes' => $attributes,
        'events' => $events,
        'sdgs' => $sdgs,
      ];
    }

    return $data;
  }
}
